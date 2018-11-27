let password;

exports.setPassword = function(el) {
    password = el;
}

exports.ogRest = function(param1, param2) {
    return {
    	url: false,
        endpoints: {
            get: {
                toggle: {
                    path: '/cc?dkey=' + password + '&click=1'
                },
                
                variables: {
                    path: '/jc'
                },

                options: {
                    path: '/jo'
                },

                ap: {
                    path: '/cc?dkey=' + password + '&apmode=1'
                },

                reboot: {
                    path: '/cc?dkey=' + password + '&reboot=1'
                },

                setthreshold: {
                    path: '/co?dkey=' + password,
                    params: {
                        dth: {type: 'number', required: true}
                    }
                },

                mount: {
                    path: '/co?dkey=' + password,
                    params: {
                        mnt: {type: 'number', required: true}
                    }
                }

            }
        }
    }
};