import { Company } from "../Models/company.model.js";
import getDataUri from '../utils/datauri.js'
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  const { companyName } = req.body;
  if (!companyName) {
    return res.status(400).json({
      message: "Please provide some name",
      success: false,
    });
  }

  let company = await Company.findOne({ name: companyName });

  if (company) {
    return res.status(400).json({
      message: "company already exist",
      success: false,
    });
  }

  company = await Company.create({
    name: companyName,
    userId: req.id,
  });

  return res.status(201).json({
    message: "Company registered successfully",
    company,
    success: true,
  });
};

export const getCompany = async (req, res) => {
  try {
      const userId = req.id; // logged in user id
      const companies = await Company.find({ userId });
      if (!companies) {
          return res.status(404).json({
              message: "Companies not found.",
              success: false
          })
      }
      return res.status(200).json({
          companies,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}

export const getCompanyById = async (req, res) => {
  const id = req.params.id;
  const company = await Company.findById(id);
  if (!company) {
    return res.status(404).json({
      message: "Company not found",
      success: false,
    });
  }

  return res.status(200).json({
    company,
    success: true,
  });
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file; // Ensure req.file is populated via file upload middleware
    
    if (!file) {
      return res.status(400).json({
        message: "Please provide a file",
        success: false,
      });
    }
    
    const fileUri = getDataUri(file);  // Convert the file to a data URI
    console.log("File URI generated:", fileUri); // Debugging line

    // Option 1: Use Data URI upload
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "company_logos", // Optional: Specify folder in Cloudinary
    });

    // Option 2: Raw buffer upload (alternative approach)
    // const cloudResponse = await cloudinary.uploader.upload(file.buffer, {
    //   resource_type: "auto",  // Automatically detect the file type (image, video, etc.)
    //   folder: "company_logos", // Optional: Specify folder in Cloudinary
    // });

    console.log("Cloudinary response:", cloudResponse); // Debugging line
    
    const logo = cloudResponse.secure_url;  // Get the secure URL of the uploaded logo

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error); // Debugging line
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
