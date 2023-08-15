import { spawn, spawnSync } from "child_process";
import { readFile, readFileSync } from "fs";

export async function pyAgent(query: string) {
    try {

        spawnSync('python', ['src/utils/Tools/pythonAgent.py',
            'mainFunc',
            JSON.stringify(query),
            'src/utils/result.json'
        ],
        );

        // readFile("src/utils/result.json", "utf8", (err, jsonString) => {
        //     if (err) {
        //         console.log("Error reading file from disk:", err);
        //         return;
        //     }
        //     try {
        //         const stdOut = JSON.parse(jsonString);
        //         console.log("Final Output:", stdOut?.output);
        //         result = stdOut?.output
        //     } catch (err) {
        //         console.log("Error parsing JSON string:", err);
        //     }
        // });

        // const pythonProcess = await spawn('python3 ', [
        //     './Tools/pythonAgent.py',
        //     'mainFunc',
        //     JSON.stringify(query)
        // ]);

        // const result = pythonProcess.stdout?.toString()?.trim();
        // const error = pythonProcess.stderr?.toString()?.trim();

        // const status = result !== null;
        // if (status) {
        //     console.log("Result returned!")
        //     return result;
        // } else {
        //     console.log("Python Agent Error", error)
        // }
    } catch (e) {
        console.log("Python Agent Caller Error", e);
    }
}

export async function completeResult() {
    let result: string = "Default Message";
    const buffer = readFileSync("src/utils/result.json")
    result = JSON.parse(buffer.toString()).output;
    console.log("Final Result: ", result);
    return result;
}