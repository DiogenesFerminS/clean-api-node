import compression from 'compression';
import express, { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
};

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const {port, routes ,public_path = 'public'} = options

        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(compression)

        //* Public Folder
        this.app.use(express.static(this.public_path));

        this.app.use(this.routes)
        

        //* SPA
        this.app.get("/{*splat}", (req, res) => {
          const indexPath = path.join(__dirname, `../../${this.public_path}/index.html`);
          res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}