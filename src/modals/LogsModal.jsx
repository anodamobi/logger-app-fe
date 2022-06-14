import { Modal } from "@mantine/core";
import { Text } from "./LogsModal.style";

const LogsModal = ({ isOpen, onClose, data }) => {
  return (
    <>
      <Modal size="lg" opened={isOpen} onClose={onClose} title="Log">
        <div>
          <Text>Trace id: </Text>
          <span>{data.traceId}</span>
        </div>
        <div>
          <Text>Context: </Text>
          <span>{data.context}</span>
        </div>
        <div>
          <Text>Time: </Text>
          <span>{data.timestamp}</span>
        </div>
        <div>
          <Text>Message: </Text>
          <span>{data.message}</span>
        </div>
      </Modal>
    </>
  );
};

export default LogsModal;
