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
const core_1 = require("@actions/core");
const command_1 = require("./utils/command");
exports.dumpDiffs = (diffs, logger) => {
    logger.startProcess('Dump diffs');
    console.log(diffs);
    logger.endProcess();
};
exports.setResult = (diffs, logger) => {
    const insertions = command_1.sumResults(diffs, item => item.insertions);
    const deletions = command_1.sumResults(diffs, item => item.deletions);
    logger.startProcess('Dump output');
    [
        { name: 'diff', value: command_1.getDiffFiles(diffs, false), envNameSuffix: '' },
        { name: 'filtered_diff', value: command_1.getDiffFiles(diffs, true) },
        { name: 'count', value: diffs.length },
        { name: 'insertions', value: insertions },
        { name: 'deletions', value: deletions },
        { name: 'lines', value: insertions + deletions },
    ].forEach(setting => {
        var _a;
        const result = String(setting.value);
        core_1.setOutput(setting.name, result);
        const envName = core_1.getInput('SET_ENV_NAME' + ((_a = setting.envNameSuffix) !== null && _a !== void 0 ? _a : `_${setting.name.toUpperCase()}`));
        if (envName) {
            core_1.exportVariable(envName, result);
        }
        console.log(`${setting.name}: ${result}`);
    });
    logger.endProcess();
};
exports.execute = (logger, context, diffs) => __awaiter(void 0, void 0, void 0, function* () {
    const _diff = diffs !== null && diffs !== void 0 ? diffs : yield command_1.getGitDiff(logger, context);
    exports.dumpDiffs(_diff, logger);
    exports.setResult(_diff, logger);
});