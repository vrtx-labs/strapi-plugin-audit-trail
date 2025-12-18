/*
 *
 * HomePage
 *
 */

import React, { useState } from 'react';
import { Typography, Button, Grid, } from '@strapi/design-system';
import { Layouts } from '@strapi/admin/strapi-admin';
import TrashIcon from '../../components/TrashIcon';
import logRequests from '../../api/log-request';
const name = "Audit Trail";

const HomePage = () => {
  const [isButton1Loading, setIsButton1Loading] = useState(false);
  const handleSubmit = async (cache_type) => {
    let res = {};
    if (cache_type === 'flush_logs') {
      setIsButton1Loading(true);
      res = await logRequests.flush();
      setIsButton1Loading(false);
    }
  };

  return (
    <Layouts.Root>
      <p>test text</p>
      <Layouts.Header
        title={name}
        subtitle="Clear Audit Trails"
        as="h2"
      />
      <Layouts.Content>
        <Typography variant="delta" as="h2"></Typography>
        <Grid.Root gap={6}>
          <Grid.Item col={6} s={6}>
            <Typography variant="delta" as="h2">1. Clear audit trails.</Typography>
          </Grid.Item>
          <Grid.Item col={4} s={4}>
            <Button
              onClick={() => handleSubmit('flush_logs')}
              startIcon={<TrashIcon />}
              size="M"
              disabled={isButton1Loading}
              loading={isButton1Loading}
            >
              Clear
            </Button>
          </Grid.Item>
        </Grid.Root>
      </Layouts.Content>
    </Layouts.Root>
  );
};

export default HomePage;
