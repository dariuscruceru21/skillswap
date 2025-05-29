import Redis from "ioredis"
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
