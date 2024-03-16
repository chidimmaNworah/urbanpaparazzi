import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/header";
import styles from "@/styles/forgot.module.scss";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { BiLeftArrowAlt } from "react-icons/bi";
import Footer from "@/components/footer";
import { TiTick } from "react-icons/ti";
import { TbSquareRoundedLetterX } from "react-icons/tb";
import Link from "next/link";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import DotLoader from "@/components/loaders/dotLoader";

const ActivationPage = ({ user_id }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        setLoading(true);
        const { data } = await axios.put("/api/auth/activateEmail", {
          user_id,
        });
        console.log(data);
        // setMessage(response.data.message);
        setLoading(false);
        setSuccess(data.message);
      } catch (error) {
        setError("Error activating your account.");
      }
    };

    activateAccount();
  }, [router.query]);

  return (
    <div>
      <>
        {loading && <DotLoader loading={loading} />}
        <Header country="" />
        <div className={styles.forgot}>
          <div>
            <div style={{ marginTop: "10px" }}>
              {error && (
                <span className={`flex flex-col ${styles.error}`}>
                  <div className={styles.back__svg}>
                    <TbSquareRoundedLetterX /> {error}
                  </div>
                </span>
              )}
              {success && (
                <span className={`flex flex-col ${styles.success}`}>
                  <div className={styles.back__svg}>
                    <TiTick /> {success}
                  </div>
                </span>
              )}
            </div>
            <Link href="/">
              <div className={styles.forgot__header}>
                <CircledIconBtn type="submit" text="Start Shopping!" />
              </div>
            </Link>
          </div>
        </div>
        <Footer country="" />
      </>
    </div>
  );
};

export default ActivationPage;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //     },
  //   };
  // }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);

  return {
    props: { user_id: user_id.id },
  };
}
