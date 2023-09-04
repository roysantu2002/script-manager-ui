// pages/components/DeviceLog.js

import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axiosInstance from "../../utils/axios";

const DeviceLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const latestLogs = {};

  // Iterate through the log data to find the latest log for each device
  logs.forEach((log) => {
    const deviceId = log.device_id;
    const createdAt = moment(log.created_at);

    if (
      !latestLogs[deviceId] ||
      createdAt.isAfter(latestLogs[deviceId].createdAt)
    ) {
      latestLogs[deviceId] = {
        createdAt,
        logData: log.log_data,
        ipAddress: log.ip_address,
      };
    }
  });

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/scripts/logs/")
      .then((response) => {
        // Assuming the response data is an array of devices
        setLogs(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Map through the log data to generate cards for each device
  const deviceCards = Object.keys(latestLogs).map((deviceId) => (
    <Card key={deviceId} className='mb-3'>
      <Card.Body>
        <Card.Title>Device {deviceId}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          IP Address: {latestLogs[deviceId].ipAddress}
        </Card.Subtitle>
        <Card.Text>
          Latest Log Data: {JSON.stringify(latestLogs[deviceId].logData)}
        </Card.Text>
        <Card.Text>
          Created At:{" "}
          {latestLogs[deviceId].createdAt.format("MMMM DD, YYYY hh:mm A")}
        </Card.Text>
      </Card.Body>
    </Card>
  ));

  return (
    <Container>
      {loading ? (
        // Show the Bootstrap spinner while loading
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <Row>
          <Col>{deviceCards}</Col>
        </Row>
      )}
    </Container>
  );
};

export default DeviceLog;
