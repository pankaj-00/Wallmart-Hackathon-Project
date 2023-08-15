import app from "./src/server";
import { initializeVectorStore } from "./src/utils/Tools/searchText";
import { initializeModel } from "./src/utils/convAgent";

const port = process.env["PORT"];

async function runServer() {
    // await initializeVectorStore();
    // await initializeModel(0.1);
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

runServer();