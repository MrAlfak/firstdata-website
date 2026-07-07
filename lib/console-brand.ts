const BRAND_STYLE =
  "font-family:monospace;font-size:26px;font-weight:700;color:#080c08;background:#33ff66;padding:6px 14px;border-radius:2px;";

const BRAND_STYLE_FA =
  "font-family:Rooyin,Tahoma,sans-serif;font-size:26px;font-weight:700;color:#080c08;background:#33ff66;padding:6px 14px;border-radius:2px;";

const TAG_STYLE = "font-family:monospace;font-size:11px;color:#33ff66;line-height:1.6;";

const TAG_STYLE_FA = "font-family:Rooyin,Tahoma,sans-serif;font-size:11px;color:#33ff66;line-height:1.6;";

const MUTED_STYLE = "font-family:monospace;font-size:10px;color:#33ff6644;";

const ASCII = `
 ███████╗██████╗
 ██╔════╝██╔══██╗
 █████╗  ██║  ██║
 ██╔══╝  ██║  ██║
 ██║     ██████╔╝
 ╚═╝     ╚═════╝`;

export const LANG_CHANGE_EVENT = "fd:lang-change";

export function printConsoleBrand(fa: boolean, force = false): void {
  const w = globalThis as typeof globalThis & { __fdConsoleLang?: string };
  const key = fa ? "fa" : "en";
  if (!force && w.__fdConsoleLang === key) return;
  w.__fdConsoleLang = key;

  console.log(`%c${ASCII}`, "font-family:monospace;font-size:9px;color:#33ff66;line-height:1.15;");

  if (fa) {
    console.log("%c اولین دیتا ", BRAND_STYLE_FA);
    console.log("%c ما می‌سازیم. شما رشد می‌کنید.", TAG_STYLE_FA);
    console.log("%c → firstdata.ir/contactus", TAG_STYLE_FA);
    console.log("%c dev؟ به ما سر بزن: info@firstdata.ir", MUTED_STYLE);
  } else {
    console.log("%c FirstData ", BRAND_STYLE);
    console.log("%c We build. You grow.", TAG_STYLE);
    console.log("%c → firstdata.ir/contactus", TAG_STYLE);
    console.log("%c Hiring developers? info@firstdata.ir", MUTED_STYLE);
  }
}
