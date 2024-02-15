import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { widget } = service;

  const { data: gluetunData, error: gluetunError } = useWidgetAPI(widget, "ip");
  const { data: gluetunPortData, error: gluetunPortError } = useWidgetAPI(widget, "port");

  if (gluetunError || gluetunPortError) {
    const finalError = gluetunError ?? gluetunPortError
    return <Container service={service} error={finalError} />;
  }

  if (!gluetunData || !gluetunPortData) {
    return (
      <Container service={service}>
        <Block label="gluetun.public_ip" />
        <Block label="gluetun.region" />
        <Block label="gluetun.country" />
        <Block label="gluetun.port" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="gluetun.public_ip" value={gluetunData.public_ip} />
      <Block label="gluetun.region" value={gluetunData.region} />
      <Block label="gluetun.country" value={gluetunData.country} />
      <Block label="port" value={gluetunPortData.port} />
    </Container>
  );
}
