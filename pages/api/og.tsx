/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest, res: NextResponse) {
  const queryParameters = new URL(req.url).searchParams;
  const title = queryParameters.get("title");
  const fontData = await fetch(
    new URL("../../assets/ClashGrotesk-Bold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          placeItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "ClashGrotesk",
          fontStyle: "bold",
          border: "4px solid #fff",
          borderRadius: "40px",
        }}
      >
        <div tw="flex justify-center place-items-center">
          <div tw="flex flex-col place-items-center w-fit py-12 px-4 justify-center p-8">
            <p tw="text-6xl font-bold font-mono text-center">{title}</p>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/anotherone/image/upload/v1697342869/Group-1_ermjjb.svg"
          alt="knnls"
          height={120}
          width={79.34}
          tw="absolute top-8 invert"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "fluent",
      fonts: [
        {
          name: "ClashGrotesk",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
