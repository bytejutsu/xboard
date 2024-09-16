import React, { Suspense } from "react";

//STORE CONFIG
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { compose, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

//STORE
import rootReducer from "./Store/index";

//ROUTES
import Route from "./Routes";

//LANGUAGE
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import intlMessagesEn from "@i18n/localization/en.json";
import intlMessagesVi from "@i18n/localization/vi.json";

// ANTD
import ConfigProvider from "antd/es/config-provider";

const persistConfig = {
  key: "root",
  transforms: [],
  storage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = compose;

const store = configureStore({
  reducer: persistedReducer,
  stateReconciler: autoMergeLevel2,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});
let persistor = persistStore(store);

i18next.use(initReactI18next).init({
  fallbackLng: "vi",
  lng: "vi",
  resources: {
    en: intlMessagesEn,
    vi: intlMessagesVi,
  },
  // have a common namespace used around the full app
  ns: ["common"],
  defaultNS: "common",
  debug: false,
  // cache: {
  //   enabled: true
  // },
  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  },
});

const BootStrap = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff9c25",
                borderRadius: 4,
              },
              components: {
                Popover: {
                  boxShadow: "0px 2px 10px rgba(5, 0, 56, 0.08)",
                },
                InputNumber: {
                  colorBorder: "#ff9c25",
                },
              },
            }}
          >
            <Suspense fallback={<div>Loading</div>}>
              <Route />
            </Suspense>
          </ConfigProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default BootStrap;
