import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "../data/schema";

type SchemaValues = z.infer<typeof schema>;

const onValid: SubmitHandler<SchemaValues> = async ({ email, password }) => {
  console.log(email, password);
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
      <section>
        <label>사용자 이름</label>
        <input
          id="username"
          type="text"
          className="ml-2 my-2 text-xl border-2 border-gray-500"
          {...register("username", {
            pattern: {
              value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]$/,
              message: "username은 영문,숫자,한글만 입력 가능합니다.",
            },
          })}
        />
        {!errors.username ? (
          <span className="text-green-500 flex flex-col items-center"></span>
        ) : (
          <span className="text-red-500 flex flex-col items-center">
            {errors.username?.message}
          </span>
        )}
      </section>
      <section>
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
      </section>
      <section>
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
      </section>
      <section>
        <label htmlFor="비밀번호 확인">비밀번호 확인</label>
        <input
          id="confirmPasswsord"
          type="password"
          className="ml-2 my-2 text-xl border-2 border-gray-500"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500  flex flex-col items-center">
            {errors.confirmPassword.message}
          </span>
        )}
      </section>
      <button
        className="text-xl bg-gray-300 hover:bg-gray-400 p-2 rounded-md max-w-[10rem] flex ml-2"
        type="submit">
        회원가입
      </button>
    </form>
  );
};

export default Form;
