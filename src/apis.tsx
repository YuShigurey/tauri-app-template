import { invoke } from "@tauri-apps/api/tauri";

interface IAPI {
    greet: (name: string) => Promise<string>
    mountFS: (FS: any) => Promise<void>
}

var APIs: IAPI

if (false) {
    APIs = {
        greet: async (name) => {return invoke("greet", { name })},
        mountFS: async (FS) => {}
    }
} else {
    APIs = {
        greet: async (name:string) => {
            return `Hello, ${name}! You've been greeted from React!`
        },
        mountFS: async (FS:any) => {}
    }
}


export default APIs