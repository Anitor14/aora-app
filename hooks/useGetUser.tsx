import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/appwrite";
import useUserStore from "@/stores/userStore";
import { User } from "@/lib/types";

const useGetUser = () => {
  // const { setIsLogged, setUser } = useUserStore();
  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (error && isError) {
    console.log(error);
  }

  //   if (user) {
  //     setIsLogged(true);
  //     setUser(user);
  //   } else {
  //     setIsLogged(false);
  //     setUser(null);
  //   }

  return { isLoading, user };
};

export default useGetUser;
