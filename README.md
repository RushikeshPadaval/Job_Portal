
 A comprehensive job portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to browse job listings, apply for jobs, and manage their applications seamlessly.


## Features

- **User Authentication:** Secure authentication using JWT (JSON Web Tokens) for both job seekers and employers.
- **Job Listings:** Browse through a wide range of job listings fetched from MongoDB.
- **Application Management:** Job seekers can manage their job applications, and employers can view and manage received applications.
- **Responsive Design:** Ensures a seamless experience across all devices.
- **Google form integrated

## Technologies Used

- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens), Bcrypt (for password hash)


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your machine with latest version or v22.2.0 above
- MongoDB Atlas account (or local MongoDB server)


### Installation

1. Clone the repo:

2. Install NPM packages:
   ```sh
   cd react-job-portal
   cd backend
   npm install
   cd..
   cd frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `config.env` file after creating a `config folder` in the backend directory, containing the following variables:
   ```env
   PORT=
   FRONTEND_URL=
   DB_URL=
   
   ```

   Replace each value with your specific configuration details.

4. Run the application:
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` to view the app.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
