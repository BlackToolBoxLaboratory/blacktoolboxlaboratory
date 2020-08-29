import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTE } from '@src/assets/definitions/constants';

const ApplicationsContaier = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route
          path={ROUTE.APPLICATIONS_FACEBOOK_SDK}
          component={React.lazy(() => import('@src/routes/applications/FacebookSDKContainer.jsx'))}
        />
        <Route
          path={ROUTE.APPLICATIONS_LANGUAGES}
          component={React.lazy(() => import('@src/routes/applications/LanguagesContainer.jsx'))}
        />
        <Route
          path={ROUTE.APPLICATIONS_VALIDATOR}
          component={React.lazy(() => import('@src/routes/applications/ValidatorContainer.jsx'))}
        />
      </Switch>
    </Suspense>
  );
};

export default ApplicationsContaier;
