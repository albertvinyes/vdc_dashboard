=============================
Horizon - Virtual Data Center
=============================

This repository holds the Horizon server for the Virtual Data Center COSIGN Use Case.

Pre-req:
========

Before setting up the dashboard you need to install OpenStack Liberty with Heat.

$ sudo apt-get install git
$ git clone https://git.openstack.org/openstack-dev/devstack -b stable/liberty
$ cd devstack

You can now add Heat and Neutron by creating a file namec localrc with the following content inside the devstack folder.

disable_service n-net
enable_service q-svc
enable_service q-agt
enable_service q-dhcp
enable_service q-l3
enable_service neutron
enable_service heat
enable_service h-api
enable_service h-api-cnf
enable_service h-api-cw
enable_service h-eng

And finally to initiate the installation execute the stack.sh script and be patient, it will take a long time to install all the requirements and prepare the environment.

$ ./stack.sh

Using Horizon
=============
Run the following commands replacing STASH_USER with your COSIGN repos user at stash.i2cat.net.

$ git clone http://STASH_USER@stash.i2cat.net/scm/cosign/horizon_vdc.git
$ cd horizon_vdc/
$ cp openstack_dashboard/local/local_settings.py.example openstack_dashboard/local/local_settings.py
$ python manage.py migrate_settings --gendiff

Now everything is ready. Choose to port a run the server, for instance 8877.

$ ./run_tests.sh --runserver 0.0.0.0:8877

See ``doc/source/topics/install.rst`` about how to install Horizon
in your OpenStack setup. It describes the example steps and
has pointers for more detailed settings and configurations.

It is also available at http://docs.openstack.org/developer/horizon/topics/install.html.

