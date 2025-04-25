import React, { useCallback, useState } from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataTableCard2 } from "asab_webui_components";
import { DateTime } from "asab_webui_components";

export function TableScreen(props) {
  const { t } = useTranslation();
  const [hoveredUserId, setHoveredUserId] = useState(null);

  const columns = [
    {
      title: t("Table|Username"),
      thStyle: { minWidth: "2rem" },
      render: ({ row }) => (
        <span
          onMouseEnter={() => setHoveredUserId(row.id)}
          onMouseLeave={() => setHoveredUserId(null)}
          style={{ cursor: "pointer" }}
        >
          <NavLink to={`/detail/${row.id}`}>{row.username}</NavLink>
          <br />
          {hoveredUserId === row.id && <small>Id: {row.id}</small>}
        </span>
      ),
    },
    {
      title: t("Table|Email"),
      thStyle: { minWidth: "2rem" },
      render: ({ row }) => <p>{row.email}</p>,
    },
    {
      title: t("Table|Created"),
      thStyle: { minWidth: "2rem" },
      render: ({ row }) => <DateTime value={row.created} />,
    },
    {
      title: t("Table|Last sign in"),
      thStyle: { minWidth: "2rem" },
      render: ({ row }) => <DateTime value={row.last_sign_in} />,
    },
  ];

  const loader = useCallback(async ({ params }) => {
    const response = await axios.get("https://devtest.teskalabs.com/data", {
      params,
    });
    const rows = response.data.data;
    const count = response.data.count;
    return { rows, count };
  }, []);

  return (
    <Container className="h-100">
      <DataTableCard2
        app={{}}
        columns={columns}
        loader={loader}
        header={<h2>{t("Table|Header")}</h2>}
      />
    </Container>
  );
}
