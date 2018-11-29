import React from 'react';
import { Formik } from 'formik';
import { Text } from '@deity/falcon-ui';
import { FormField, Form, FormSubmit, FormErrorSummary } from '../Forms';
import { RequestPasswordResetMutation } from './AccountRecoveryMutations';

type ForgotPasswordProps = {
  onCompleted?: () => void;
};

export const ForgotPasswordForm: React.SFC<ForgotPasswordProps> = ({ onCompleted }) => (
  <RequestPasswordResetMutation onCompleted={onCompleted}>
    {(requestPasswordReset, { loading, error, called }) => (
      <Formik
        initialValues={{
          email: ''
        }}
        onSubmit={values =>
          requestPasswordReset({
            variables: {
              input: {
                email: values.email
              }
            }
          })
        }
      >
        {({ values }) => (
          <Form>
            <FormField id="forgotPasswordEmail" label="Email" name="email" required type="email" autoComplete="email" />

            <FormSubmit submitting={loading} value="Reset my password" />

            <FormErrorSummary errors={error && [error.message]} />

            {!loading &&
              called && (
                <Text mt="md" fontSize="md">
                  If there is an account associated with <b>{values.email}</b> you will receive an email with a link to
                  reset your password.
                </Text>
              )}
          </Form>
        )}
      </Formik>
    )}
  </RequestPasswordResetMutation>
);
