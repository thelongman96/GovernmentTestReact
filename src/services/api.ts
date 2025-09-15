import { head } from 'lodash';
import { api } from './apiDefaults';
import { executeApi } from './executeApi';

export const login = async ({
  username,
  password,
}: {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}) => {
  const apiObj = {
    url: `auth/login`,
    params: { username, password },
    type: 'post',
    api: api,
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const register = async ({
  username,
  password,
  email,
  firstName,
  lastName,
}: {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
}) => {
  const apiObj = {
    url: `auth/register`,
    params: { username, password, email, firstName, lastName },
    type: 'post',
    api: api,
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const validateSessionToken = async ({ loginToken }: { loginToken: string }) => {
  const apiObj = {
    url: `auth/me`,
    type: 'get',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const fetchCases = async ({ loginToken }: { loginToken: string }) => {
  const apiObj = {
    url: `cases`,
    type: 'get',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const fetchCaseById = async ({ loginToken, caseId }: { loginToken: string, caseId: string; }) => {
  const apiObj = {
    url: `cases/${caseId}`,
    type: 'get',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const fetchTasksByCaseId = async ({ loginToken, caseId }: { loginToken: string, caseId: string }) => {
  const apiObj = {
    url: `tasks/caseId/${caseId}`,
    type: 'get',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const createCase = async ({ loginToken, title, referenceNumber, description }: { loginToken: string, title: string, referenceNumber: string, description: string }) => {
  const apiObj = {
    url: `cases`,
    params: { title, referenceNumber, description },
    type: 'post',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const updateCase = async ({ loginToken, id, title, referenceNumber, description }: { loginToken: string, id: number, title: string, referenceNumber: string, description: string }) => {
  const apiObj = {
    url: `cases/${id}`,
    params: { id, title, referenceNumber, description },
    type: 'put',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const deleteCase = async ({ loginToken, caseId }: { loginToken: string, caseId: string }) => {
  const apiObj = {
    url: `cases/${caseId}`,
    type: 'delete',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const createTask = async ({ loginToken, title, status, description, caseId }: { loginToken: string, title: string, status: string, description: string, caseId: string }) => {
  const apiObj = {
    url: `tasks`,
    params: { title, status, description, caseId },
    type: 'post',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const updateTask = async ({ loginToken, id, title, status, description }: { loginToken: string, id: number, title: string, status: string, description: string }) => {
  const apiObj = {
    url: `tasks/${id}`,
    params: { id, title, status, description },
    type: 'put',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};

export const deleteTask = async ({ loginToken, taskId }: { loginToken: string, taskId: string }) => {
  const apiObj = {
    url: `tasks/${taskId}`,
    type: 'delete',
    api: api,
    headers: {
      'X-Session-ID': loginToken
    }
  };

  const finalResponse = executeApi({
    apiObj,
  });
  return finalResponse;
};
