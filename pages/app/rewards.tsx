import { NextPage } from "next";
import { useRouter } from "next/router";

interface RewardsProps {}

const Rewards: NextPage<RewardsProps> = () => {
  const router = useRouter();

  return (
    <img
      onClick={() => router.push("/app")}
      src="/rewards.png"
      alt=""
      className="w-screen h-screen object-cover"
    />
  );
};

export default Rewards;
