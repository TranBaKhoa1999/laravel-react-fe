import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Thêm cấu hình để tắt rule `react/no-unescaped-entities`
  {
    rules: {
      "react/no-unescaped-entities": "off", // Tắt rule
    },
  },
  
];

export default eslintConfig;
