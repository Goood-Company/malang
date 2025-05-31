import { useEffect, useState } from "react";

function SettingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchFn = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFn();
  }, []);

  if (isLoading) return <>로딩중</>;

  return <div>짬 관련 페이지</div>;
}

export default SettingPage;
