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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mint_token = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const config_1 = require("./config");
const mint_token = (fromAddress, toAddress, token_amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fromAddress)));
        const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
        const recipientPublicKey = new web3_js_1.PublicKey(toAddress);
        const mintPublicKey = new web3_js_1.PublicKey(config_1.token_mint_address);
        // create an associated token account (ATA) for the recipient if it doesn't exist
        const ata = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, keypair, // payer's keypair
        mintPublicKey, recipientPublicKey // the account to receive the tokens
        );
        console.log("Associated Token Account:", ata.address.toBase58());
    }
    catch (error) {
        console.error("Error creating associated token account:", error);
    }
});
exports.mint_token = mint_token;
