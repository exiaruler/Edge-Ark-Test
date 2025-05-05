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
const team = require('../model/team');
// delete all teams
function deleteAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield team.deleteMany({});
    });
}
function addTeam(teamName) {
    return __awaiter(this, void 0, void 0, function* () {
        const add = yield new team({ team: teamName }).save();
        return add;
    });
}
function updateTeam(teamObj) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield team(teamObj).save();
    });
}
// find team by team name
function findTeam(teamName) {
    return __awaiter(this, void 0, void 0, function* () {
        var rec = null;
        const findTeam = yield team.findOne({ team: teamName });
        if (findTeam != null) {
            rec = findTeam;
        }
        return rec;
    });
}
function findTeamSearch(teamName) {
    return __awaiter(this, void 0, void 0, function* () {
        teamName = teamName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const findTeams = yield team.find({ team: { $regex: `^${teamName}`, $options: 'i' } }).populate({ path: 'fixtures', populate: {
                path: 'homeTeam', model: 'Team'
            } }).populate({ path: 'fixtures', populate: {
                path: 'awayTeam', model: 'Team'
            } }).exec();
        return findTeams;
    });
}
module.exports = {
    findTeam,
    findTeamSearch,
    addTeam,
    updateTeam,
    deleteAll
};
