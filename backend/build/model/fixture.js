"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemea = mongoose_1.default.Schema;
// match model storage
const fixtureSchema = new schemea({
    fixtureMid: {
        type: String,
        required: true,
        index: true
    },
    season: {
        type: Number,
        required: true
    },
    competitionName: {
        type: String
    },
    fixtureDateTime: {
        type: Date,
        required: true
    },
    fixtureRound: {
        type: Number,
        required: true
    },
    homeTeam: {
        type: schemea.Types.ObjectId,
        ref: "Team",
        required: true
    },
    awayTeam: {
        type: schemea.Types.ObjectId,
        ref: "Team",
        required: true
    }
});
const fixture = mongoose_1.default.model('Fixture', fixtureSchema);
module.exports = fixture;
