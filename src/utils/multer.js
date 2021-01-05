import multer from 'multer';
import path from 'path';

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(null, true);
    }
    return cb(new Error('file type is not supported'), false);
  },
});
