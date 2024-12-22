import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { User2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import store from "@/redux/store";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("Logout button clicked!");
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null)); // Clear user state in Redux
        console.log("Redux state after logout:", store.getState());
        navigate("/"); // Redirect to home
        toast.success(res.data.message); // Show success toast
      } else {
        toast.error("Logout failed. Please try again."); // Handle unexpected errors
      }
    } catch (error) {
      console.error("Logout Handler Error:", error);
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="nav-left">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>

        <div className="nav-right flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Job</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Conditionally render based on user state */}
          {user == null ? (
            <div className="flex gap-2">
              <Link to={"/login"}>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#6A38C2] hover:bg-[#3c1f6f]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={user?.profilePhoto || "https://github.com/shadcn.png"}
                    alt={`@${user?.fullName || "user"}`}
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white rounded-md shadow-md">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        user?.profilePhoto || "https://github.com/shadcn.png"
                      }
                      alt={`@${user?.fullName || "user"}`}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-bold">
                      {user?.fullName || "Guest User"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || "No email available"}
                    </p>
                  </div>
                </div>

                

                <div className="flex flex-col items-start mt-3">

                {user && user.role === "student"?(
                  <>
                  <Button variant="link">
                    <User2 className="mr-3" />{" "}
                    
                      
                      <Link to="/profile">View Profile</Link>
                      
                    
                    
                  </Button>
                  </>
                ): " "}
                  <Button onClick={logoutHandler} variant="link">
                    <LogOut className="mr-3" /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
