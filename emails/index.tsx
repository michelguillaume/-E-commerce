import { Button, Html } from "@react-email/components";
import * as React from "react";
import {Theme} from "@auth/core/types";

export default function Email(params: { url: string; host: string; theme: Theme }) {
    const { url, host, theme } = params

    return (
        <Html>
            <Button
                href={url}
                style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
            >
                Click me
            </Button>
        </Html>
    );
}
