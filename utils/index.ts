import { toast } from "~/components/ui/toast";
import moment from "moment";
import { TToolID } from "~/services/api/chat/type";
export function shortAddress(address?: string, numOfShow = 4) {
  if (!address) return "";
  const tmpAddress = address.trim();
  if (tmpAddress.length <= 22) return tmpAddress;

  return `${tmpAddress.substring(0, numOfShow)}...${tmpAddress.substring(tmpAddress.length - numOfShow, tmpAddress.length)}`;
}

export const formatNotationNumber = (number?: string | number, customBehind?: number) => {
  let behind = 1;
  if (typeof number === "string" && number.length === 0) return "--";
  if (typeof number === "undefined") return "--";
  if (number === null) return "--";
  if (!number) return "0";
  if (!/[0-9]+/g.test(number.toString())) return number.toString();
  if (Number.isNaN(Number(number))) return number.toString();
  if (Math.abs(Number(number)) < 1000) behind = 2;
  if (Math.abs(Number(number)) < 100) behind = 3;
  if (Math.abs(Number(number)) < 10) behind = 4;
  if (customBehind) behind = customBehind;

  const num = Number(number.toString().replace(/[,]/g, ""));
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return Math.abs(num) > 9999 ? `${num < 0 ? "-" : ""}${formatter.format(Math.abs(num))}` : formatNumber(num, behind);
};

export const formatNumber = (number?: string | number, behind = 5) => {
  if (number === undefined) return "";
  if (number === "0" || Number(number) === 0) {
    return "0";
  }
  const min = 1 / Math.pow(10, behind);
  if (Math.abs(Number(number)) < min) {
    if (behind === 0) return "< 0.0001";
    return `< 0.${"0".repeat(behind - 1)}1`;
  }
  let value = number.toString();
  if (value.includes(".") || value.includes(",")) {
    value = value.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    const [frontDot, behindDot] = value.split(".");
    const tmpSub = Math.round(Number(`0.${behindDot}`) * Math.pow(10, behind)) / Math.pow(10, behind);
    const [sub1, sub2] = tmpSub.toString().split(".");
    value = `${Number(frontDot) + Number(sub1 || 0)}${sub2 ? "." : ""}${sub2 || ""}`;
  } else {
    value = value.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  return value;
};

export function getTimeDurationLabel(time: number, onlyHour = false) {
  if (time === 0) return "0s";
  if (time < 60) return `${Math.floor(time)}s`;
  const m = Math.floor(time / 60);
  const h = Math.floor(m / 60);
  if (h < 1) return `${m} minutes`;
  if (h < 24) return `${h}h ${m % 60 && !onlyHour ? `${m % 60}m` : ""}`;

  return `${Math.floor(h / 24)}d`;
}

export function formatSeconds(sec?: number): string {
  if (!sec) {
    return "";
  }
  if (sec < 60) {
    return `${sec.toString().padStart(2, "0")}s`;
  }
  if (sec < 3600) {
    return `${Math.floor(sec / 60)
      .toString()
      .padStart(2, "0")}m${formatSeconds(sec % 60)}`;
  }
  return `${Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0")}h${formatSeconds(sec % 3600)}`;
}

export function copyToClipboard(str: string) {
  const textarea = document.createElement("textarea");
  const text = str || "";
  textarea.textContent = text;
  textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy"); // Security exception may be thrown by some browsers.
    try {
      navigator.clipboard.writeText(str);
    } catch (error) {}

    toast({
      title: "Copied to clipboard",
      duration: 3000,
    });
  } catch (ex) {
    console.warn("Copy to clipboard failed.", ex);
    toast({
      title: "Coppy failed",
      duration: 3000,
      variant: "destructive",
    });
  } finally {
    document.body.removeChild(textarea);
  }
}

export function convertToolOutput(output: string, toolId?: TToolID) {
  try {
    if (!output) return undefined;
    if (toolId === "dataset_4f7c1e48_f62d_4f75_bf3b_80d4167a50a9") return convertTokenOutput(output);
    if (toolId === "dataset_4f7c1e48-f62d-4f75-bf3b-80d4167a50a9") return convertTokenOutput(output);
    let outputStr = output.split("tool response: ")[0] || "";
    if (outputStr.endsWith(".")) {
      outputStr = outputStr.slice(0, -1);
    }
    const parseOutput = JSON.parse(output.split("tool response: ")[0]);

    return parseOutput.output?.data || parseOutput.data || parseOutput.output || parseOutput;
  } catch (error) {
    return undefined;
  }
}

function convertTokenOutput(output: string): any[] {
  if (!output) return [];
  const tokensStr = output.split("\n");
  const tokens = tokensStr.map((str) => {
    const splitItem = str.split("Token ");
    splitItem.shift();
    const objToken: any = {};
    splitItem.forEach((fieldStr) => {
      const splits = fieldStr.split(":");
      const fieldName = splits.shift() || "";
      const fieldValue = splits.join(":").trim();
      objToken[fieldName.toLocaleLowerCase()] = fieldValue;
      if (fieldValue[fieldValue.length - 1] === ";") {
        objToken[fieldName.toLocaleLowerCase()] = fieldValue.trim().slice(0, -1);
      }
    });
    return objToken;
  });
  return tokens;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTimeLabel(time: number, format = "DD/MM, HH:mm") {
  const diff = Math.abs(moment(time).diff(moment(), "minutes"));
  const otherDay = time < moment().startOf("day").toDate().getTime();
  if (!otherDay) return moment(time).format("HH:mm");

  if (diff < 24 * 60) return `Yesterday, ${moment(time).format("HH:mm")}`;

  return moment(time).format(format);
}

export function getTimeToDiff(time: number) {
  const diff = Math.abs(moment(time * 1000).diff(moment(), "minutes"));
  if (diff === 0) return "Just now";
  if (diff < 60) return `${diff} minutes`;
  if (diff < 24 * 60) return Math.floor(diff / 60) + " hour" + (diff > 120 ? "s" : "");
  return Math.floor(diff / (24 * 60)) + "d";
}

export function getTokenExplorerLink(address: string) {
  return "https://gmgn.ai/bsc/token/" + address;
}

export function getTokenScanLink(address: string) {
  return "https://bscscan.com/token/" + address;
}

export function getImageUrl(imgUrl: string, address: string) {
  if (!imgUrl) return "";
  return imgUrl;
}
