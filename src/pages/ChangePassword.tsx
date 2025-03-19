import { useState } from "react";
import Button from "../components/Button";

const ChangePassword = () => {
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(""); // 비밀번호 길이 오류
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 불일치 오류
  const [isDisabled, setIsDisabled] = useState(true);

  // 비밀번호 유효성 검사
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, [name]: value };
    setFormValues(updatedFormValues);

    let passwordErr = "";
    let confirmPasswordErr = "";

    // 비밀번호 길이 검사 (8~20자)
    if (name === "password" || name === "confirmPassword") {
      if (
        updatedFormValues.password.length < 8 ||
        updatedFormValues.password.length > 20
      ) {
        passwordErr = "비밀번호는 8~20자 사이로 입력해주세요.";
      }
    }

    // 비밀번호 일치 검사
    if (
      updatedFormValues.confirmPassword &&
      updatedFormValues.confirmPassword !== updatedFormValues.password
    ) {
      confirmPasswordErr = "비밀번호가 일치하지 않습니다.";
    }

    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    // 버튼 활성화
    setIsDisabled(
      !!(
        passwordErr ||
        confirmPasswordErr ||
        !updatedFormValues.password ||
        !updatedFormValues.confirmPassword
      )
    );
  };

  // 비밀번호 변경 API 호출
  const handleChangePassword = async () => {
    if (isDisabled) return;

    try {
      // await changePasswordApi({ password: formValues.password });
      alert("비밀번호가 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div className="h-[80vh] w-[1050px] mx-auto my-14">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">비밀번호 변경</h1>
        <span className="text-gray-600">
          회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
          확인해주세요.
        </span>
      </div>

      <div className="border-t-2 border-b p-6 mb-8">
        <div className="grid grid-cols-2 gap-0 mx-auto items-center mb-5">
          <label className="mb-2 font-medium text-gray-700 w-[50vw]">
            새로운 비밀번호
          </label>
          <input
            type="password"
            name="password"
            placeholder="새로운 비밀번호를 입력해주세요"
            className="w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0 "
            value={formValues.password}
            onChange={onChangeInput}
          />
        </div>

        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}

        <div className="grid grid-cols-2 items-center">
          <label className="mb-2 font-medium text-gray-700">
            새로운 비밀번호 확인
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="새로운 비밀번호를 다시 한 번 입력해주세요"
            className="w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0"
            value={formValues.confirmPassword}
            onChange={onChangeInput}
          />
        </div>

        {confirmPasswordError && (
          <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          text={"완료"}
          type={"normal"}
          onClick={handleChangePassword}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
