import express, {Application} from "express";
import bookRoutes from "./routes/book.routes";

const app: Application = express();
const PORT =process.env.PORT || 3000;

app.use(express.json());
app.use('/api',bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});