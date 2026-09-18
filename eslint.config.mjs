import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // Carpetas a ignorar (Debe ir arriba del todo)
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "public/**",
      ".vscode/**",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml"
    ]
  },

  // Configuración recomendada base de JavaScript
  js.configs.recommended,

  // Configuración global de sintaxis y entorno
  {
    languageOptions: {
      ecmaVersion: "latest",

      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // Configuración nativa para React y React Hooks
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off"
    },

    settings: {
      react: {
        version: "detect"
      }
    }
  },

  // Configuración nativa para Next.js (Reemplaza a FlatCompat)
  {
    plugins: {
      "@next/next": nextPlugin
    },

    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules
    }
  },

  // Tus reglas personalizadas de calidad de código
  {
    plugins: {
      prettier: prettierPlugin
    },

    rules: {
      // Integración con Prettier (fuerza fin de línea LF)
      "prettier/prettier": ["error", { endOfLine: "lf" }],

      // Variables declaradas que no se usan
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // Evita dejar console.log (permite warnings y errors)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Obliga a usar let o const en vez de var
      "no-var": "error",

      // Pide const si la variable nunca se reasigna
      "prefer-const": "error",

      // Fuerza comparaciones estrictas (===)
      eqeqeq: ["error", "always"],

      // Evita imports duplicados
      "no-duplicate-imports": "error",

      // Desactiva la validación obligatoria de PropTypes
      "react/prop-types": "off",

      // Permite los atributos "jsx" y "global" en las etiquetas <style> de Next.js
      "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }]
    }
  },

  // Desactiva reglas de conflicto con Prettier (Debe ir estrictamente al final)
  eslintConfigPrettier
];
