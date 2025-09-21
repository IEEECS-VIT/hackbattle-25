export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message (question) is required" }),
        { status: 422 }
      );
    }

    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000);

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Modal-Key": process.env.MODAL_KEY,
        "Modal-Secret": process.env.MODAL_SECRET,
      },
      body: JSON.stringify({ question: message }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const rawText = await res.text();
    console.log("Modal raw response:", rawText);

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Modal API failed: ${rawText}` }),
        { status: res.status }
      );
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { reply: rawText };
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
