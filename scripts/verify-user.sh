#!/bin/sh
# Password can be set via
# read -s SLS_PASS
# export SLS_PASS

if [[ "${SLS_PASS}" == "" ]]; then
  echo Need to set SLS_PASS
  exit -1
fi

source .script-vars

raws cognito-idp admin-confirm-sign-up \
   --region ${AWS_REGION} \
   --user-pool-id ${USER_POOL_ID} \
   --username 'contact+1@codeshrink.com'
