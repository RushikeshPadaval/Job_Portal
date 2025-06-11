import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";


export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
  }

  const { name, email, coverLetter, phone, address, jobId, resumeLink } = req.body;

  if (!name || !email || !coverLetter || !phone || !address || !resumeLink || !jobId) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resumeUrl: resumeLink,
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});



export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);




// import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
// import ErrorHandler from "../middlewares/error.js";
// import { Application } from "../models/applicationSchema.js";
// import { Job } from "../models/jobSchema.js";
// import cloudinary from "cloudinary";

// // Job Seeker - Post Application
// export const postApplication = catchAsyncErrors(async (req, res, next) => {
//   console.log("Received Request Body:", req.body);
//   console.log("Received Files:", req.files); // Debugging logs

//   const { role } = req.user;
//   if (role === "Employer") {
//     return next(new ErrorHandler("Employers are not allowed to apply for jobs.", 400));
//   }

//   // Ensure file is uploaded
//   if (!req.files || !req.files.resume) {
//     return next(new ErrorHandler("Resume file is required!", 400));
//   }

//   const { resume } = req.files;
//   const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

//   if (!allowedFormats.includes(resume.mimetype)) {
//     return next(new ErrorHandler("Invalid file type. Please upload a PDF, PNG, or JPEG file.", 400));
//   }

//   // Upload to Cloudinary
//   let cloudinaryResponse;
//   try {
//     cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
//       resource_type: "auto",
//     });
//   } catch (err) {
//     console.error("Cloudinary Upload Error:", err);
//     return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
//   }

//   const { name, email, coverLetter, phone, address, jobId } = req.body;
//   if (!name || !email || !coverLetter || !phone || !address || !jobId) {
//     return next(new ErrorHandler("Please fill all fields.", 400));
//   }

//   // Check if job exists
//   const jobDetails = await Job.findById(jobId);
//   if (!jobDetails) {
//     return next(new ErrorHandler("Job not found!", 404));
//   }

//   const applicantID = { user: req.user._id, role: "Job Seeker" };
//   const employerID = { user: jobDetails.postedBy, role: "Employer" };

//   // Save application to DB
//   const application = await Application.create({
//     name,
//     email,
//     coverLetter,
//     phone,
//     address,
//     jobId, // ✅ Ensure jobId is saved
//     applicantID,
//     employerID,
//     resume: {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     },
//   });

//   res.status(200).json({
//     success: true,
//     message: "Application Submitted Successfully!",
//     application,
//   });
// });

// // Employer - Get All Applications
// export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
//   const { role } = req.user;
//   if (role === "Job Seeker") {
//     return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
//   }
//   const { _id } = req.user;
//   const applications = await Application.find({ "employerID.user": _id });
//   res.status(200).json({
//     success: true,
//     applications,
//   });
// });

// // Job Seeker - Get All Applications
// export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
//   const { role } = req.user;
//   if (role === "Employer") {
//     return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
//   }
//   const { _id } = req.user;
//   const applications = await Application.find({ "applicantID.user": _id });
//   res.status(200).json({
//     success: true,
//     applications,
//   });
// });

// // Job Seeker - Delete Application
// export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
//   const { role } = req.user;
//   if (role === "Employer") {
//     return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
//   }
//   const { id } = req.params;
//   const application = await Application.findById(id);
//   if (!application) {
//     return next(new ErrorHandler("Application not found!", 404));
//   }
//   await application.deleteOne();
//   res.status(200).json({
//     success: true,
//     message: "Application Deleted!",
//   });
// });
