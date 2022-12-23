import fs from 'fs';
import child_process from 'child_process';

/*
import { Script, createContext } from 'vm';
function compileCode(code: string): string {
    try {
        let contextObj = {
            console: console,
        };

        const vmContext = createContext(contextObj);
        const script = new Script(code);
        return String(script.runInContext(vmContext));
    } catch {
        return '';
    }
}

export default compileCode;

*/

const compileCode = (script: string, session: string): Promise<string | null> => {
    return new Promise(resolve => {
        const tempFileName = __dirname + '../../../../../temp/' + session + '.ts';

        fs.writeFile(tempFileName, script, (err: any) => {
            if (err) {
                // handle error
                return;
            }

            child_process.execFile('node', [tempFileName], (err: any, stdout: string, stderr: string) => {
                fs.unlinkSync(tempFileName);
                if (err) throw err;

                resolve(stdout ? stdout : stderr);

                console.log(stdout, stderr);
            });
        });
    });
};

export default compileCode;
