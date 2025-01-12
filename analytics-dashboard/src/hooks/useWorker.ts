import { useEffect, useRef, useState } from "react";

export const useWorker = <T>({ type, data }: { type: string; data: any[] }) => {
  const workerRef = useRef<Worker>(null);
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.length === 0) return;

    setLoading(true);
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL("../workers/dataWorker", import.meta.url));
    }

    workerRef.current.onmessage = (event: MessageEvent<{ type: string; result: T }>) => {
      if (event.data.type === type) {
        setResult(event.data.result);
        setLoading(false);
      }
    };

    workerRef.current.postMessage({ type, data });

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [type, data]);

  return { result, loading };
};
