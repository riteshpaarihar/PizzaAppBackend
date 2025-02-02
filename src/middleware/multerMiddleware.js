import multer from 'multer';
import path from 'path';

// const storageConfiguration = multer.diskStorage({
//     destination: (req, file, next) => {
//         next(null, "/uploads");
//     },
//     filename: (req, file, next) => {
//         console.log(file);
//         next(null, `${Date.now()}-${path.extname(file.originalName)}`);

//     }
// })

const storageConfiguration = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, "uploads"); // Relative path (make sure 'uploads' exists in your project root)
    },
    filename: (req, file, next) => {
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`); // Correct property name
    }
});

const uploader = multer({ storage: storageConfiguration })


export default uploader;




// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure uploads folder exists
// const uploadDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storageConfiguration = multer.diskStorage({
//     destination: (req, file, next) => {
//         next(null, uploadDir);
//     },
//     filename: (req, file, next) => {
//         console.log(file);
//         next(null, `${Date.now()}-${file.originalname}`); 
//     }
// });

// const uploader = multer({ storage: storageConfiguration });

// export default uploader;