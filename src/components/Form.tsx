import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// 스키마 정의
const schema = z
  .object({
    username: z.string().refine((val) => val.length >= 3 && val.length <= 10, {
      message: "username은 3글자 이상 10글자 이하입니다.",
    }),
    email: z
      .string()
      .min(1, { message: "1글자 이상은 채워주세요." })
      .email({ message: "유효한 이메일을 입력하세요" }),
    password: z.string().min(6, "6글자 이상으로 해주세요."),
  })
  .required();

type SchemaValues = z.infer<typeof schema>;

const onValid: SubmitHandler<SchemaValues> = (data) => {
  // console.log(data);
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <form
      className="flex flex-col items-center justify-center h-72 w-72p-2 rounded-md"
      onSubmit={handleSubmit(onValid)}>
      <div>
        <label>사용자 이름</label>
        <input
          id="username"
          type="text"
          className="ml-2 my-2 text-xl border-2 border-gray-500"
          {...register("username", {
            pattern: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]$/,
          })}
        />
        {!errors.username ? (
          <span className="text-green-500 flex flex-col items-center"></span>
        ) : (
          <span className="text-red-500 flex flex-col items-center">
            {errors.username?.message}
          </span>
        )}
      </div>
      <div>
        <label>이메일</label>
        <input
          id="email"
          type="text"
          className="ml-2 my-2 text-xl border-2 border-gray-500"
          {...register("email", {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          })}
        />
        {errors.email?.type && String(!errors.email) === "pattern" ? (
          <span className="text-green-500 flex flex-col items-center">
            유효한 이메일입니다.
          </span>
        ) : (
          <span className="text-red-500 flex flex-col ">
            {errors.email?.message}
          </span>
        )}
      </div>
      <div>
        <label>비밀번호</label>
        <input
          id="password"
          className="ml-2 my-2 text-xl border-2 border-gray-500"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500  flex flex-col items-center">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        // disabled={!isValid}
        className="text-xl bg-gray-300 hover:bg-gray-400 p-2 rounded-md max-w-[10rem] flex ml-2"
        type="submit">
        회원가입
      </button>
    </form>
  );
};

export default Form;
