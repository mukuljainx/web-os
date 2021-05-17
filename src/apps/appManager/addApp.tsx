import * as React from "react";

import { Stack, StackItem, Text } from "atoms/styled";
import { PrimaryButton, TextField, ProgressIndicator } from "@fluentui/react";
import api from "utils/api";

interface IAppStatus {
  status: string;
  activity: string;
  error?: any;
  data?: any;
  stage: number;
}

interface IProps {
  onSuccess: () => void;
}

const AddApp = ({ onSuccess }: IProps) => {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<IAppStatus>();
  const [id, setId] = React.useState("");
  const [totalStages, setTotalStages] = React.useState(7);
  const timer = React.useRef<NodeJS.Timeout>();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e!.target);
    setLoading(true);
    setStatus({ status: "UPLOADING", activity: "uploading files", stage: 1 });
    api
      .post("/manager/build/react", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setId(data.id);
        // one is ours
        setTotalStages(data.totalStages);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (id) {
      timer.current = setInterval(() => {
        api
          .get(`manager/build/status/${id}`)
          .then(({ data }) => {
            if (data.status === "FAILED") {
              clearInterval(timer.current!);
            }
            setStatus(data);
          })
          .catch((e) => {
            console.log(e);
            clearInterval(timer.current!);
          });
      }, 1000);
    }

    return () => timer.current && clearInterval(timer.current);
  }, [id]);

  if (loading) {
    return (
      <Stack flexDirection="column" gap={16} style={{ width: 360 }}>
        <StackItem>
          <ProgressIndicator
            label={
              status?.status === "DONE" ? "App Published" : "Publishing App"
            }
            description={status?.activity}
            percentComplete={(status?.stage || 0) / totalStages}
          />
        </StackItem>
        {status?.status === "FAILED" && (
          <>
            <StackItem>
              <Text as="p">Failed with the following error</Text>
            </StackItem>
            <StackItem>
              <TextField
                multiline
                rows={3}
                value={JSON.stringify(status, null, 4)}
              />
            </StackItem>
          </>
        )}
        <StackItem>
          <PrimaryButton onClick={onSuccess}>Go Back</PrimaryButton>
        </StackItem>
      </Stack>
    );
  }

  return (
    <Stack
      flexDirection="column"
      gap={16}
      alignItems="center"
      justifyContent="center"
      style={{ textAlign: "center" }}
    >
      <StackItem>
        <Text variant="medium" weight="bold">
          Upload an App
        </Text>
      </StackItem>
      <StackItem>
        <Text textAlign="center">
          Download your React JS App from CodeSandbox as zip and upload here
        </Text>
        <br />
        <Text textAlign="center">Max size allowed is 10mb.</Text>
      </StackItem>
      <StackItem>
        <form onSubmit={onSubmit}>
          <Stack flexDirection="column" gap={16}>
            <StackItem>
              <TextField label="App Name" name="name" type="string" required />
            </StackItem>
            <StackItem>
              <TextField label="Icon Url" name="icon" type="string" required />
            </StackItem>
            <StackItem>
              <Stack gap={8}>
                <StackItem>
                  <TextField
                    label="Width"
                    name="width"
                    type="string"
                    required
                  />
                </StackItem>
                <StackItem>
                  <TextField
                    label="Height"
                    name="height"
                    type="string"
                    required
                  />
                </StackItem>
              </Stack>
            </StackItem>
            <StackItem>
              <input accept=".zip" name="app" type="file" required />
            </StackItem>
            <StackItem>
              <PrimaryButton type="submit">Upload App</PrimaryButton>
            </StackItem>
          </Stack>
        </form>
      </StackItem>
    </Stack>
  );
};

export default AddApp;
