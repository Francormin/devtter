import { useEffect, useState } from "react";

import Head from "next/head";

import { loginWithGitHub, onAuthStateChanged } from "@/firebase/client";

import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import GitHubLogo from "@/components/Icons/github";

import { colors } from "@/styles/theme";

export default function Home() {
  const [user, setUser] = useState(undefined);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch(err => console.error(err));
  };

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  return (
    <>
      <Head>
        <title>Devtter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devtter-logo.png" alt="Devtter Logo" />
          <h1>Devtter</h1>
          <h2>
            Talk about development
            <br /> with developers 👨‍💻👩‍💻
          </h2>

          <div>
            {user === undefined && (
              <Button onClick={handleClick}>
                <GitHubLogo fill={colors.white} width={24} height={24} />
                Login with GitHub
              </Button>
            )}

            {user && user.avatar && (
              <div>
                <img src={user.avatar} />
                <strong>{user.name}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        img {
          width: 120px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
