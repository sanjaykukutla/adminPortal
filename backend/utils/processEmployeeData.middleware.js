// Middleware function to process employee data and files
export const processEmployeeData = (req, res, next) => {
    const { name, email, phone, position, gender, courses } = req.body;

    // Access the uploaded file(s)
    const imageFile = req.files['image'];

    if (!imageFile || imageFile.length === 0) {
        return res.status(400).json({ message: 'Image file is required.' });
    }

    // console.log('Uploaded Files:', imageFile[0].destination);
    // console.log('Employee Details:', { name, email, phone, position, gender, courses });

    // Here you can add your logic to process the data (e.g., save to a database)
    // For example:
    // const employeeData = { name, email, phone, position, gender, courses, image: imageFile[0] };

    // You can add the processed data to req object if you need to use it in the next middleware or route handler
    req.body = { name, email, phone, position, gender, courses, 'path': imageFile[0].path};

    // Call the next middleware or route handler
    next();
};


export const processUpdateEmployeeData = (req, res, next) => {
    const { name, email, phone, position, gender, courses } = req.body;

    // Access the uploaded file(s)
    if(Object.keys(req?.files).length>0){
    const imageFile = req.files['image'];
    // You can add the processed data to req object if you need to use it in the next middleware or route handler
    req.body = { name, email, phone, position, gender, courses, 'path': imageFile[0]?.path};
    }
    // Call the next middleware or route handler
    next();
};


