import {
  loginActionTypes,
  userActionTypes,
  organizationActionTypes,
  workspaceActionTypes,
  pipelineActionTypes,
  stackActionTypes,
  runActionTypes,
  billingActionTypes,
  signupActionTypes,
  forgotActionTypes,
  stripeActionTypes,
} from '../actionTypes';

export const actionTypesHandledByRequestSaga: string[] = [
  loginActionTypes.request,
  signupActionTypes.request,
  forgotActionTypes.request,
  userActionTypes.getMyUser.request,
  userActionTypes.getUserForId.request,
  organizationActionTypes.getMyOrganization.request,
  organizationActionTypes.getInviteForCode.request,
  organizationActionTypes.getInvites.request,
  organizationActionTypes.getOwner.request,
  organizationActionTypes.getMembers.request,
  organizationActionTypes.getRoles.request,
  organizationActionTypes.invite.request,
  organizationActionTypes.deleteInvite.request,
  organizationActionTypes.getInvoices.request,
  organizationActionTypes.retryInvoice.request,
  organizationActionTypes.invite.request,
  workspaceActionTypes.getMyWorkspaces.request,
  workspaceActionTypes.getPipelinesForWorkspaceId.request,
  pipelineActionTypes.getMyPipelines.request,
  pipelineActionTypes.getPipelineForId.request,
  pipelineActionTypes.getRunsByPipelineId.request,
  stackActionTypes.getMyStacks.request,
  stackActionTypes.getStackForId.request,
  stackActionTypes.getRunsByStackId.request,
  runActionTypes.getRunForId.request,
  billingActionTypes.getBillingForRunId.request,
  billingActionTypes.getOrganizationBilling.request,
  stripeActionTypes.getStripePortalUrl.request,
  stripeActionTypes.getPaymentMethod.request,
  stripeActionTypes.updatePaymentMethod.request,
  stripeActionTypes.updateSubscription.request,
  stripeActionTypes.getSubscription.request,
];
