import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-unused-vars":"off", // 코드상에 사용하지 않는 변수가 있을 때 오류로 알려주는 옵션
      "react/prop-types": "off", // 리액트를 조금 더 안전하게 사용하게 해주는 옵션
      "@typescript-eslint/no-unused-vars": "warn" // 타입스크립트 사용하지 않는 변수 경고 
    },
  },
)
