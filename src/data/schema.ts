import { z } from "zod";

// 스키마 정의
export const schema = z
  .object({
    username: z.string().refine((val) => val.length >= 3 && val.length <= 10, {
      message: "username은 3글자 이상 10글자 이하입니다.",
    }),
    email: z
      .string()
      .min(1, { message: "1글자 이상은 채워주세요." })
      .email({ message: "유효한 이메일을 입력하세요" }),
    password: z.string().min(6, "6글자 이상으로 해주세요."),
    confirmPassword: z
      .string()
      .min(1, { message: "비밀번호 확인란은 필수항목입니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
