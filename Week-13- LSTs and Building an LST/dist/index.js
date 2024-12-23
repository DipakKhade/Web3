"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mintToken_1 = require("./mintToken");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.post("/helium", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mintToken_1.mint_token)("CCbC7H2PoGj9hZ3VaUTyeJJ5SnhNbPcYdLa7nSCGQP6q", "C7D9BsnoDiyeLbcyTwKm2RaMcREVTM5DFh6AbZ9MYMkT", 0.001);
    res.json({});
    return;
}));
app.listen(PORT, () => {
    console.log(`http server is up on PORT ${PORT}`);
});
