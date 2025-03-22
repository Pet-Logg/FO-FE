import { useState } from "react";
import { changePassword } from "../api/auth";
import { PasswordData } from "../types/PasswordData";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
type ChangePasswordForm = Omit<PasswordData, "password"> & {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const nav = useNavigate();

  const [formValues, setFormValues] = useState<ChangePasswordForm>({
    password: "",
    confirmPassword: "",
  });

  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?_])[A-Za-z\d!@#$%^&*?_]{8,16}$/;

  const [passwordError, setPasswordError] = useState(""); // 비밀번호 길이 오류
  // const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 불일치 오류
  const [isDisabled, setIsDisabled] = useState(true);

  // 비밀번호 유효성 검사
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, [name]: value };
    setFormValues(updatedFormValues);

    let passwordErr = "";

    // 비밀번호 정규식 검사
    if (name === "password") {
      if (!passwordPattern.test(value) && value.length > 0) {
        passwordErr =
          "비밀번호는 8~16자, 영문, 숫자, 특수문자를 포함해야 합니다.";
        setPasswordError(passwordErr);
        return;
      }
    }

    // 입력이 비어 있으면 오류 메시지 초기화
    if (value.length === 0) {
      passwordErr = "";
    }

    // 비밀번호 일치 검사
    if (name === "confirmPassword" && value !== updatedFormValues.password) {
      passwordErr = "비밀번호가 일치하지 않습니다.";
      setPasswordError(passwordErr);
      return;
    }

    // 버튼 활성화
    setIsDisabled(
      !!(
        passwordErr ||
        !updatedFormValues.password ||
        !updatedFormValues.confirmPassword
      )
    );
  };

  // 비밀번호 변경 API 호출
  const handleChangePassword = async () => {
    if (isDisabled) return;

    try {
      await changePassword(formValues.password);
      alert("비밀번호가 성공적으로 변경되었습니다!");

      nav("/");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-[650px] w-[1050px] mx-auto mt-40">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">비밀번호 변경</h1>
        <span className="text-gray-600">
          회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
          확인해주세요.
        </span>
      </div>

      <div className="border-t-2 border-b p-12 mb-8 ">
        <div className="w-2/3 mx-auto">
          <div className="gap-1 mx-auto mb-5 flex flex-col">
            <div className="flex items-center">
              <label className="font-medium text-gray-700 w-[320px] mr-[80px]">
                새로운 비밀번호
              </label>
              <div className="flex flex-col w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="새로운 비밀번호를 입력해주세요"
                  className="w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0 "
                  value={formValues.password}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>

          <div className="gap-1 mx-auto flex flex-col">
            <div className="flex items-center">
              <label className="font-medium text-gray-700 w-[320px] mr-[80px]">
                새로운 비밀번호 확인
              </label>
              <div className="flex flex-col w-full">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="새로운 비밀번호를 다시 한 번 입력해주세요"
                  className="w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0"
                  value={formValues.confirmPassword}
                  onChange={onChangeInput}
                />

                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
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
