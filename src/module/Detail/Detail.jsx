import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DateTime } from "asab_webui_components";
import s from "./Detail.module.scss";

export const Detail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://devtest.teskalabs.com/detail/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    data && (
      <>
        <div className={s.card}>
          <div className={s.header}>
            <h2>{data.username}</h2>
          </div>
          <div className={s.content}>
            <div className={s.leftBlock}>
              <p>
                {t("Detail|Phone")}: {data.phone_number}
              </p>
              <p>
                {t("Detail|Email")}: {data.email}
              </p>
              <p>
                {t("Detail|Address")}: {data.address}
              </p>
            </div>
            <div className={s.rightBlock}>
              <p>
                {t("Detail|Created")}: <DateTime value={data.created} />
              </p>
              <p>
                {t("Detail|Last sign in")}:{" "}
                <DateTime value={data.last_sign_in} />
              </p>
              <p>
                {t("Detail|IP address")}: {data.ip_address}
              </p>
              <p>
                {t("Detail|Mac address")}: {data.mac_address}
              </p>
            </div>
          </div>
        </div>
        <NavLink to={"/"}>{t("Detail|Back")}</NavLink>
      </>
    )
  );
};
