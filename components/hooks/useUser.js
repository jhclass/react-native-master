import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { logUserIn, isLoggedInVar, logoutFunc } from "../../apollo";
import { useEffect } from "react";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      totalFollowing
      totalFollower
    }
  }
`;
//token 이 변경되었거나 없다면 로그아웃
//토큰이 req header 에 계속 존재해야 함. 따라서 apollo.js 를 수정 했다. 백엔드 서버에서 테스트 할때 header 값에 토큰값을 계속 넣어줬던걸 생각해보면 간단하게 해결
const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);

  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken, //false 라면
  });
  //console.log("sending data", data);
  useEffect(() => {
    if (data?.me === null) {
      //console.log("there is data", data);
      logoutFunc();
    }
  }, [data]);

  return { data };
};

export default useUser;
